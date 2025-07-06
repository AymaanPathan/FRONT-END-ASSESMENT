# VectorShift Pipeline Builder

A modern, extensible visual pipeline builder built with React and FastAPI. Create, connect, and validate node-based workflows with real-time feedback and dynamic functionality.

## 🚀 Features

### Core Functionality

- **Visual Pipeline Builder**: Drag-and-drop interface for creating node-based workflows
- **Universal Node System**: Flexible abstraction for creating new node types with minimal code
- **Dynamic Text Nodes**: Auto-resizing text inputs with variable extraction and dynamic handles
- **Real-time Validation**: Backend integration for pipeline validation and DAG detection
- **Modern UI**: Clean, responsive design with light/dark mode support

### Technical Highlights

- **Node Abstraction**: Reusable UniversalNode component that eliminates code duplication
- **Variable System**: Automatic variable detection in text nodes with `{{ variableName }}` syntax
- **Pipeline Validation**: Real-time DAG (Directed Acyclic Graph) validation
- **Type Safety**: Structured data models for frontend-backend communication

## 📋 Prerequisites

- **Node.js**
- **Python**
- **npm** or **yarn**
- **pip**

## 🛠️ Installation & Setup

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

#### For Linux/macOS:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### For Windows:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

## 🏗️ Architecture

### Frontend Structure

```
frontend/
├── src/
│   ├── api/                 # API service layer
│   │   └── isDagOrNot.api.js # Backend communication
│   ├── components/
│   │   ├── ui/              # Shadcn/UI components
│   │   └── result/          # Result modal component
│   ├── nodes/
│   │   ├── UniversalNode/   # Base node abstraction
│   │   ├── TextNode/        # Text node implementation
│   │   └── [other-nodes]/   # Additional node types
│   ├── store.js             # Zustand state management
│   ├── Submit.js      # Pipeline submission component
```

### Backend Structure

```
backend/
├── main.py                  # FastAPI application
├── models/
│   └── PipelineData.py     # Data models
└── requirements.txt
```

## 🔧 Key Components

### Universal Node System

The `UniversalNode` component serves as the foundation for all node types:

```javascript
import { UniversalNode } from "../UniversalNode/UniversalNode";
import { TEXT_NODE_CONFIG } from "./TEXT_NODE_CONFIG";

export const TextNode = ({ props }) => (
  <UniversalNode {...props} nodeConfig={TEXT_NODE_CONFIG} />
);
```

**Benefits:**

- ✅ Eliminates code duplication
- ✅ Consistent styling across all nodes
- ✅ Easy creation of new node types
- ✅ Centralized state management

### Dynamic Text Nodes

Text nodes automatically:

- **Resize** based on content length
- **Extract variables** from `{{ variableName }}` syntax
- **Create dynamic handles** for each detected variable
- **Display variable badges** for visual feedback

### Pipeline Validation

The backend provides real-time validation:

- **Node/Edge counting**
- **DAG detection** using NetworkX
- **Structured error handling**
- **CORS-enabled** for frontend integration

## 🎨 Styling & Theming

### Design System

- **Framework**: Tailwind CSS
- **Components**: Shadcn/UI
- **Theming**: next-themes for light/dark mode
- **Colors**: Consistent color palette with semantic naming
- **Animations**: Smooth transitions and hover effects

## 🔌 API Integration

### Frontend → Backend Communication

The frontend uses a dedicated API layer with Zustand state management

**API Service (`api/isDagOrNot.api.js`):**

```javascript
import { useStore } from "../store";
import axios from "axios";

export const checkIsDagOrNotApi = async () => {
  const { nodes, edges } = useStore.getState();

  try {
    const response = await axios.post("http://127.0.0.1:8000/pipelines/parse", {
      nodes: nodes.map((n) => ({ id: n.id })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};
```

**State Management Integration:**

```javascript
// Zustand store handles pipeline submission
submitPipeline: async () => {
  set({ isSubmitting: true });
  try {
    const response = await checkIsDagOrNotApi();
    return response;
  } catch (err) {
    throw err;
  } finally {
    set({ isSubmitting: false });
  }
};
```

### Backend Response Format

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

### User Experience Features

- **Loading States**: Submit button shows spinner and "Analyzing..." text
- **Result Modal**: Clean modal presentation of validation results
- **Error Handling**: User-friendly error messages for failed validations

## 📝 Usage Examples

### Creating a New Node Type

1. **Define the configuration:**

```javascript
export const CUSTOM_NODE_CONFIG = {
  title: "Custom Node",
  description: "A custom node example",
  width: 250,
  height: 150,
  fields: [
    {
      name: "customField",
      label: "Custom Field",
      type: "text",
      defaultValue: "",
    },
  ],
  handles: [
    { id: "input", type: "target", position: "left" },
    { id: "output", type: "source", position: "right" },
  ],
};
```

2. **Create the node component:**

```javascript
import { UniversalNode } from "../UniversalNode/UniversalNode";
import { CUSTOM_NODE_CONFIG } from "./CUSTOM_NODE_CONFIG";

export const CustomNode = (props) => (
  <UniversalNode {...props} nodeConfig={CUSTOM_NODE_CONFIG} />
);
```

### Using Variables in Text Nodes

Simply type variables in the text input using double curly braces:

```
Hello {{ userName }}, your score is {{ score }}!
```

This automatically creates:

- Two input handles on the left side
- Variable badges showing "userName" and "score"
- Dynamic node resizing

## 🧪 Testing the Pipeline

1. **Create nodes** by dragging them onto the canvas
2. **Connect nodes** by dragging between handles
3. **Add text content** with variables like `{{ input }}`
4. **Click Submit** to validate your pipeline
5. **View results** in the alert popup

## 🔍 Development Notes

### Node Abstraction Benefits

- **Maintainability**: Changes to base functionality affect all nodes
- **Consistency**: Uniform behavior and styling
- **Scalability**: Easy to add new node types
- **Flexibility**: Configurable fields, handles, and dimensions

## 🙏 Acknowledgments

- **React Flow** for the visual pipeline foundation
- **Shadcn/UI** for the beautiful component library
- **FastAPI** for the robust backend framework
- **NetworkX** for graph analysis capabilities
- **Tailwind CSS** for the utility-first styling approach
