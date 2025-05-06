import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  ColorMode,
  useReactFlow,
} from '@xyflow/react';
import { generateId } from './utils/generateId';
import { Screen } from './types/types';
 
import '@xyflow/react/dist/style.css';
import CustomNode from './nodes/CustomNode';
import CustomEdge from './edges/CustomEdge';
 
const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: '1' },
    type: 'customNode'
  },
  {
    id: '2',
    position: { x: 0, y: 180 },
    data: { label: '2' },
    type: 'customNode'
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'customEdge' }];
 
const nodeTypes = {
  customNode: CustomNode,
}

const edgeTypes = { 
  customEdge: CustomEdge,
}

export default function App() {
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
 
  const onConnect = useCallback(
    (params: any) =>  setEdges((eds) =>
      addEdge({ ...params, type: 'customEdge' }, eds)
    ),
    [setEdges],
  );

  const refreshDiagram = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addNewNode = (screen: Screen) => {
    const center = screenToFlowPosition({
      x: screen.x / 2,
      y: screen.y / 2,
    });

    const newNode = {
      id: generateId('node'),
      position: center,
      data: { label: `${nodes.length + 1}`},
      type: 'customNode'
    }

    setNodes([...nodes, newNode])
  };

  useEffect(() => {
    const handleMessage = (event: any) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'setColorMode') {
          setColorMode(data.mode);
        };
        if (data.type === 'refreshDiagram') {
          refreshDiagram();
        };
        if (data.type === 'addNewNode') {
          addNewNode(data.screen);
        };
      } catch (err) {
        console.error('Invalid message from RN:', err);
      }
    }
  
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refreshDiagram, addNewNode]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={colorMode}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}