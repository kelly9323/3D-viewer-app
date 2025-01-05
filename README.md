# 3D Model Viewer App

A desktop application built using **Electron**, **React**, and **Three.js** to view and interact with 3D models in various formats. This app supports file types such as `.GLB`, `.GLTF`, `.FBX`, `.OBJ`, and `.STL`. You can upload and explore 3D models with features like grid toggling, wireframe mode, axes helper, and clipping planes.

## Features

- **Model Upload**: Drag and drop or use a file picker to load supported 3D model formats.
- **3D View**: Interact with models using mouse controls (zoom, rotate, pan).
- **Grid Display**: Toggle a grid to help visualize the model in space.
- **Wireframe Mode**: Switch between the solid model and wireframe view for a different perspective.
- **Axes Helper**: Show axes to visualize the orientation of the model.
- **Clipping Planes**: Clip through the model with adjustable planes along the X, Y, and Z axes.
- **Metadata Display**: View metadata of the loaded model, including vertex count, face count, and bounding box dimensions.

## Supported File Formats

- **.GLB**
- **.GLTF**
- **.FBX**
- **.OBJ**
- **.STL**

## Prerequisites

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/3d-viewer-app.git
   cd 3d-viewer-app
   ```
2. Install dependencies:
  ```bash
   npm install
  ```
3. For development run:
  ```bash
   npm run dev
  ```
4. For build:
  ```bash
   npm run build
  ```

# Running the 3D Viewer App After Build

After building the 3D Viewer app, you can run it on Windows:

1. Navigate to the `/release` folder
2. Launch `.exe` file and install it for your PC.
