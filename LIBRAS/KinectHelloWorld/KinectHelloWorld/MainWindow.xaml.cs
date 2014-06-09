using Microsoft.Kinect;
using Microsoft.Kinect.Toolkit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace KinectHelloWorld
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private KinectSensorChooser _kinectSensorChooser;
        private KinectSensor _kinectSensor;
        private int MinDepthDistance = 50;
        private int MaxDepthDistanceOffset = 200;

        public MainWindow()
        {
            InitializeComponent();
            _kinectSensorChooser = new KinectSensorChooser();
            Loaded += MainWindow_Loaded;
            Closing += MainWindow_Closing;
        }

        void MainWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            StopKinect(_kinectSensorChooser.Kinect);
        }

        void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            _kinectSensorChooser.KinectChanged += _kinectSensorChooser_KinectChanged;
            _kinectSensorChooser.Start();
        }

        void _kinectSensorChooser_KinectChanged(object sender, KinectChangedEventArgs e)
        {
            StopKinect(e.OldSensor);

            _kinectSensor = e.NewSensor;

            UpdateAngleInfo();
            _kinectSensor.ColorStream.Enable();
            _kinectSensor.DepthStream.Enable(DepthImageFormat.Resolution320x240Fps30);
            _kinectSensor.SkeletonStream.Enable();
            _kinectSensor.ColorFrameReady += kinectSensor_ColorFrameReady;
            _kinectSensor.DepthFrameReady += kinectSensor_DepthFrameReady;
            _kinectSensor.Start();
        }

        void kinectSensor_DepthFrameReady(object sender, DepthImageFrameReadyEventArgs e)
        {
            using (DepthImageFrame depthFrame = e.OpenDepthImageFrame())
            {
                if (depthFrame == null)
                    return;

                byte[] pixels = GenerateDepthColorPixels(depthFrame);
                DrawKinectImage(depthFrame, pixels, KinectDepthImage);

            }
        }

        private byte[] GenerateDepthColorPixels(DepthImageFrame depthFrame)
        {
            short[] rawDepthData = new short[depthFrame.PixelDataLength];
            depthFrame.CopyPixelDataTo(rawDepthData);

            byte[] pixels = new byte[depthFrame.PixelDataLength * 4];

            int blueIndex = 0;
            int greenIndex = 1;
            int redIndex = 2;
            int player, depth;
            for (int depthIndex = 0, colorIndex = 0;
                depthIndex < rawDepthData.Length && colorIndex < pixels.Length;
                depthIndex++, colorIndex += 4)
            {
                player = rawDepthData[depthIndex] & DepthImageFrame.PlayerIndexBitmask;
                depth = rawDepthData[depthIndex] >> DepthImageFrame.PlayerIndexBitmaskWidth;

                if (depth <= 900)
                {
                    pixels[colorIndex + blueIndex] = 255;
                    pixels[colorIndex + greenIndex] = 0;
                    pixels[colorIndex + redIndex] = 0;
                }
                else if (depth <= 2000)
                {
                    pixels[colorIndex + blueIndex] = 0;
                    pixels[colorIndex + greenIndex] = 255;
                    pixels[colorIndex + redIndex] = 0;
                }
                else 
                {
                    pixels[colorIndex + blueIndex] = 0;
                    pixels[colorIndex + greenIndex] = 0;
                    pixels[colorIndex + redIndex] = 255;
                }

                if (!ImagemProfundidadeComCor.IsChecked.Value)
                {
                    byte intensity = CalculateIntensityFromDepth(depth);
                    pixels[colorIndex + blueIndex] = intensity;
                    pixels[colorIndex + greenIndex] = intensity;
                    pixels[colorIndex + redIndex] = intensity;
                }
                

                if (player > 0 && ImagemProfundidadeJogador.IsChecked.Value)
                {
                    pixels[colorIndex + blueIndex] = Colors.Gold.B;
                    pixels[colorIndex + greenIndex] = Colors.Gold.G;
                    pixels[colorIndex + redIndex] = Colors.Gold.R;
                }
            }


            return pixels;
        }

        private byte CalculateIntensityFromDepth(int depth)
        {
            return (byte)(255 - (255 * Math.Max(depth - MinDepthDistance, 0) / MaxDepthDistanceOffset));
        }

        void kinectSensor_ColorFrameReady(object sender, ColorImageFrameReadyEventArgs e)
        {
            using (ColorImageFrame colorFrame = e.OpenColorImageFrame())
            {
                if (colorFrame == null)
                    return;

                byte[] pixels = new byte[colorFrame.PixelDataLength];
                colorFrame.CopyPixelDataTo(pixels);

                DrawKinectImage(colorFrame, pixels, KinectColorImage);
            }
        }

        void StopKinect(KinectSensor sensor)
        {
            if (sensor != null)
            {
                sensor.Stop();
                sensor.AudioSource.Stop();
            }
        }

        void _kinectSensor_AllFramesReady(object sender, AllFramesReadyEventArgs e)
        {
            
        }

        void DrawKinectImage(ImageFrame imageFrame, byte[] pixels, Image image)
        {
            
            int stride = imageFrame.Width * 4;
            image.Source = BitmapSource.Create(
                imageFrame.Width,
                imageFrame.Height,
                96,
                96,
                PixelFormats.Bgr32,
                null,
                pixels,
                stride);
        }

        private void Window_KeyDown(object sender, KeyEventArgs e)
        {
            int angulo = _kinectSensorChooser.Kinect.ElevationAngle,
                anguloMinimo = _kinectSensorChooser.Kinect.MinElevationAngle,
                anguloMaximo = _kinectSensorChooser.Kinect.MaxElevationAngle;

            if (e.Key == Key.Down && angulo > anguloMinimo)
                angulo--;
            else if (e.Key == Key.Up && angulo < anguloMaximo)
                angulo++;

            _kinectSensorChooser.Kinect.ElevationAngle = 0;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (_kinectSensor.ElevationAngle < _kinectSensor.MaxElevationAngle)
            {
                _kinectSensor.ElevationAngle += 9;
                UpdateAngleInfo();
            }
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            if (_kinectSensor.ElevationAngle > _kinectSensor.MinElevationAngle)
            {
                _kinectSensor.ElevationAngle -= 9;
                UpdateAngleInfo();
            }
        }

        private void UpdateAngleInfo()
        {
            string info = "";
            
            info += "Min: " + _kinectSensor.MinElevationAngle;
            info += Environment.NewLine;
            info += "Angulo: " + _kinectSensor.ElevationAngle;
            info += Environment.NewLine;
            info += "Max: " + _kinectSensor.MaxElevationAngle;

            AnguloKinect.Content = info;
        }

    }
}
