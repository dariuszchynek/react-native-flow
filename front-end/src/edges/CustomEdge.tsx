import { EdgeProps, getBezierPath, useReactFlow } from '@xyflow/react';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
}: EdgeProps) {
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleDelete = () => {
    setEdges((edges: any) => edges.filter((e: any) => e.id !== id));
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{ stroke: '#222', strokeWidth: 3 }}
      />
      {selected && (
        <foreignObject width={80} height={30} x={labelX - 40} y={labelY - 15}>
          <div
            style={{
              background: 'transparent',
              border: 0,
              textAlign: 'center',
            }}
          >
            <button
              onClick={handleDelete}
              style={{
                backgroundColor: 'white',
                borderRadius: 24,
                padding: 8,
                border: 0,
              }}
            >
              ❌
            </button>
          </div>
        </foreignObject>
      )}
    </>
  );
}
