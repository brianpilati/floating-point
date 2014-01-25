floating-point
==============

Exploration of floating points using angularJs

I have written a small controller to convert decimal numbers to binary numbers and visa versa.

My eventual goal is to convert decimal fractions to binary numbers in order to better understand floating point arthimetic.

Of course, there is always the IEEE 754 standard that I could look-up but ...

TODO
=============
I realized that I need to convert some of my controllers to services so I can inject them into the original controllers


Examples
=============

All the examples are part of the unit tests, plus more

0 = 00000000

1 = 00000001

2 = 00000010

12 = 00001100

45 = 00101101

255 = 11111111

257 = 0000000100000001

16777215 = 111111111111111111111111

4294967295 = 11111111111111111111111111111111

Some examples that I found from a similar project (http://www.exploringbinary.com/displaying-ieee-doubles-in-binary-scientific-notation/)

33.75 = 1.0000111 x 2^5

0.1 = 1.100110011001100110011001100110011001100110011001101 x 2^-4

-0.6 = -1.0011001100110011001100110011001100110011001100110011 x 2^-1

3.518437208883201171875e13 = 1.0000000000000000000000000000000000000000000000000001 x 2^45

9214843084008499.0 = 1.0000010111100110110011101100010101110111011000011001 x 2^53

30078505129381147446200.0 = 1.10010111101000111100011100100111000110110000001 x 2^74

1777820000000000000001.0 = 1.100000011000000011010101101110101101001011100011111 x 2^70

0.3932922657273 = 1.1001001010111011001101010010110001000110001000111001 x 2^-2

4.9406564584124654e-324 = 1.0 x 2^-1074

1.2e-321 = 1.1110011 x 2^-1067

2.2250738585072011e-308 = 1.111111111111111111111111111111111111111111111111111 x 2^-1023

Unit Tests
==========

I have written tests using Karma and there should be 100% passing

$ ./scripts/test.sh

