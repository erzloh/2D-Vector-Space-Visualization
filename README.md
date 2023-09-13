# 2D-Vector-Space-Visualization

## Description

This repository contains JavaScript code to visualize transformations in a 2D vector space. See how vectors and points transform under different matrix operations like shearing, shrinking, and rotating, through an animation from the initial vector space to the transformed one. The visualization is rendered using HTML5 Canvas.

I decided to do this project to put into practice Linear Algebra theory that I learned from the 3Blue1Brown Essence of Linear Algebra YouTube playlist (https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab).

## Test the project

This project is hosted using GitHub Pages. You can test the project live at [Project Live Demo URL](https://erzloh.github.io/2D-Vector-Space-Visualization/).

## Usage

1. The canvas will initialize with a set of predefined vectors and points.
2. Click on the "Transform" button to apply the matrices and observe how the vectors and points transform.

### Adding Vectors, Points, and Matrices from the DevTools Console

If you want to experiment with your own vectors, points, or matrices, you can do so directly from the browser's DevTools console.

1. **Open DevTools Console**: Right-click anywhere on the webpage and select 'Inspect Element', then navigate to the 'Console' tab.

2. **Add a Vector**: To add a vector, use the following command:
    ```javascript
    vs.addVector(x, y);
    ```
    Replace `x` and `y` with the x and y coordinates of the vector you want to add.

3. **Add a Point**: To add a point, use the following command:
    ```javascript
    vs.addPoint(x, y);
    ```
    Replace `x` and `y` with the x and y coordinates of the point you want to add.

4. **Add a Matrix**: To add a matrix, use the following command:
    ```javascript
    vs.addMatrix(a, b, c, d);
    ```
    Replace `a`, `b`, `c`, and `d` with the values of the 2x2 matrix you want to add.

5. **Apply Matrices**: To apply the transformation matrices to the vectors and points, use the following command:
    ```javascript
    vs.applyMatrices();
    ```
    This will apply all matrices added so far to all vectors and points in the vector space.

6. **Animate Transformation**: To see the transformation, click the 'Transform' button in the interface, or set `t = 0; animating = true;` from the console to initiate the animation.

Feel free to experiment and visualize how different vectors, points, and matrices interact!

## Classes

- **VectorSpace Class**: Responsible for the vector space properties and methods.
  - `addVector()`: Adds a vector.
  - `addPoint()`: Adds a point.
  - `draw()`: Renders vectors and points on the canvas.
  - `transform()`: Applies transformation matrix to vectors and points.
  - `addMatrix()`: Adds a transformation matrix.
  - `applyMatrices()`: Iteratively applies all the transformation matrices.
  
- **Vec2 Class**: Defines a 2D vector.
  - Methods for vector addition, subtraction, multiplication, etc.
  
- **Mat2 Class**: Defines a 2x2 matrix for transformations.
