import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';

export default function CustomNode({ id, data, selected }: NodeProps) {
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div>
      <div
        style={{
          padding: 12,
          border: '3px solid #999',
          borderRadius: 4,
          background: data.colorMode === 'light' ? '#000' : '#141414',
          width: 60,
          height: 48,
        }}
      >
        {selected && (
          <button
            onClick={handleDelete}
            style={{
              position: 'absolute',
              top: -2,
              left: 86,
              backgroundColor: 'transparent',
              border: 0,
            }}
          >
            ❌
          </button>
        )}
        <div>{(data as any).label}</div>
        <Handle
          type="target"
          position={Position.Top}
          style={{
            height: 12,
            width: 12,
          }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            height: 12,
            width: 12,
          }}
        />
      </div>
    </div>
  );
}