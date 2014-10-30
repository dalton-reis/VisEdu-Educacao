package br.furb.expressoesnumericas.interpretador1;

public interface ParserConstants
{
    int FIRST_SEMANTIC_ACTION = 12;

    int SHIFT  = 0;
    int REDUCE = 1;
    int ACTION = 2;
    int ACCEPT = 3;
    int GO_TO  = 4;
    int ERROR  = 5;

    int[][][] PARSER_TABLE =
    {
        { {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {SHIFT ,  4}, {ERROR ,  0}, {SHIFT ,  5}, {GO_TO ,  1}, {GO_TO ,  2}, {GO_TO ,  3}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ACCEPT,  0}, {SHIFT ,  6}, {SHIFT ,  7}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {REDUCE,  2}, {REDUCE,  2}, {REDUCE,  2}, {SHIFT ,  8}, {SHIFT ,  9}, {ERROR ,  0}, {REDUCE,  2}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {REDUCE,  5}, {REDUCE,  5}, {REDUCE,  5}, {REDUCE,  5}, {REDUCE,  5}, {ERROR ,  0}, {REDUCE,  5}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {SHIFT ,  4}, {ERROR ,  0}, {SHIFT ,  5}, {GO_TO , 10}, {GO_TO ,  2}, {GO_TO ,  3}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ACTION,  1}, {ACTION,  1}, {ACTION,  1}, {ACTION,  1}, {ACTION,  1}, {ERROR ,  0}, {ACTION,  1}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {GO_TO , 11}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {SHIFT ,  4}, {ERROR ,  0}, {SHIFT ,  5}, {ERROR ,  0}, {GO_TO , 12}, {GO_TO ,  3}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {SHIFT ,  4}, {ERROR ,  0}, {SHIFT ,  5}, {ERROR ,  0}, {GO_TO , 13}, {GO_TO ,  3}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {SHIFT ,  4}, {ERROR ,  0}, {SHIFT ,  5}, {ERROR ,  0}, {ERROR ,  0}, {GO_TO , 14}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {SHIFT ,  4}, {ERROR ,  0}, {SHIFT ,  5}, {ERROR ,  0}, {ERROR ,  0}, {GO_TO , 15}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ERROR ,  0}, {SHIFT ,  6}, {SHIFT ,  7}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {SHIFT , 16}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {REDUCE,  7}, {REDUCE,  7}, {REDUCE,  7}, {REDUCE,  7}, {REDUCE,  7}, {ERROR ,  0}, {REDUCE,  7}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ACTION,  2}, {ACTION,  2}, {ACTION,  2}, {SHIFT ,  8}, {SHIFT ,  9}, {ERROR ,  0}, {ACTION,  2}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {GO_TO , 17}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ACTION,  3}, {ACTION,  3}, {ACTION,  3}, {SHIFT ,  8}, {SHIFT ,  9}, {ERROR ,  0}, {ACTION,  3}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {GO_TO , 18}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {ACTION,  4}, {ACTION,  4}, {ACTION,  4}, {ACTION,  4}, {ACTION,  4}, {ERROR ,  0}, {ACTION,  4}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {GO_TO , 19}, {ERROR ,  0}, {ERROR ,  0} },
        { {ACTION,  5}, {ACTION,  5}, {ACTION,  5}, {ACTION,  5}, {ACTION,  5}, {ERROR ,  0}, {ACTION,  5}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {GO_TO , 20}, {ERROR ,  0} },
        { {REDUCE,  6}, {REDUCE,  6}, {REDUCE,  6}, {REDUCE,  6}, {REDUCE,  6}, {ERROR ,  0}, {REDUCE,  6}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {REDUCE,  0}, {REDUCE,  0}, {REDUCE,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {REDUCE,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {REDUCE,  1}, {REDUCE,  1}, {REDUCE,  1}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {REDUCE,  1}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {REDUCE,  3}, {REDUCE,  3}, {REDUCE,  3}, {REDUCE,  3}, {REDUCE,  3}, {ERROR ,  0}, {REDUCE,  3}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} },
        { {REDUCE,  4}, {REDUCE,  4}, {REDUCE,  4}, {REDUCE,  4}, {REDUCE,  4}, {ERROR ,  0}, {REDUCE,  4}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0}, {ERROR ,  0} }
    };

    int[][] PRODUCTIONS =
    {
        { 9, 4 },
        { 9, 4 },
        { 9, 1 },
        { 10, 4 },
        { 10, 4 },
        { 10, 1 },
        { 11, 3 },
        { 11, 2 },
        { 9, 4 },
        { 9, 4 },
        { 9, 1 },
        { 10, 4 },
        { 10, 4 },
        { 10, 1 },
        { 11, 3 },
        { 11, 2 }
    };

    String[] PARSER_ERROR =
    {
        "Erro estado 0",
        "Erro estado 1",
        "Erro estado 2",
        "Erro estado 3",
        "Erro estado 4",
        "Erro estado 5",
        "Erro estado 6",
        "Erro estado 7",
        "Erro estado 8",
        "Erro estado 9",
        "Erro estado 10",
        "Erro estado 11",
        "Erro estado 12",
        "Erro estado 13",
        "Erro estado 14",
        "Erro estado 15",
        "Erro estado 16",
        "Erro estado 17",
        "Erro estado 18",
        "Erro estado 19",
        "Erro estado 20"
    };
}
