import { Box } from '@mui/material';

const AuthVectors = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Plato con comida (parte inferior derecha) */}
      <Box
        component="svg"
        viewBox="0 0 200 200"
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '8%',
          width: '280px',
          height: '280px',
          opacity: 0.07,
        }}
      >
        {/* Plato */}
        <ellipse cx="100" cy="120" rx="70" ry="15" fill="currentColor" opacity="0.3" />
        <ellipse cx="100" cy="115" rx="75" ry="12" fill="currentColor" opacity="0.4" />
        <circle cx="100" cy="100" r="60" fill="currentColor" opacity="0.25" />
        
        {/* Hamburguesa en el plato */}
        <ellipse cx="100" cy="95" rx="35" ry="8" fill="currentColor" opacity="0.5" />
        <rect x="68" y="80" width="64" height="15" rx="8" fill="currentColor" opacity="0.6" />
        <rect x="70" y="70" width="60" height="10" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="72" y="62" width="56" height="8" rx="2" fill="currentColor" opacity="0.45" />
        <ellipse cx="100" cy="58" rx="32" ry="10" fill="currentColor" opacity="0.6" />
        
        {/* Semillas en el pan */}
        {[...Array(6)].map((_, i) => (
          <circle 
            key={`seed-${i}`}
            cx={85 + (i % 3) * 10} 
            cy={55 + Math.floor(i / 3) * 4} 
            r="1.5" 
            fill="currentColor" 
            opacity="0.7" 
          />
        ))}
        
        {/* Vapor saliendo */}
        <path d="M 85 45 Q 83 35 85 25" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
        <path d="M 100 42 Q 98 32 100 22" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
        <path d="M 115 45 Q 113 35 115 25" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
      </Box>

      {/* Reloj marcando las 12 (parte superior izquierda) */}
      <Box
        component="svg"
        viewBox="0 0 200 200"
        sx={{
          position: 'absolute',
          top: '8%',
          left: '5%',
          width: '160px',
          height: '160px',
          opacity: 0.08,
        }}
      >
        {/* Círculo exterior del reloj */}
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.6" />
        
        {/* Círculo interior */}
        <circle cx="100" cy="100" r="65" fill="currentColor" opacity="0.15" />
        
        {/* Marcadores de horas principales (12, 3, 6, 9) */}
        <circle cx="100" cy="30" r="4" fill="currentColor" opacity="0.7" />
        <circle cx="170" cy="100" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="100" cy="170" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="30" cy="100" r="4" fill="currentColor" opacity="0.5" />
        
        {/* Marcadores pequeños de otras horas */}
        {[...Array(8)].map((_, i) => {
          const angle = (i + 1) * 30 * (Math.PI / 180) - Math.PI / 2;
          if ((i + 1) % 3 !== 0) {
            const x = 100 + 60 * Math.cos(angle);
            const y = 100 + 60 * Math.sin(angle);
            return <circle key={`hour-${i}`} cx={x} cy={y} r="2" fill="currentColor" opacity="0.5" />;
          }
          return null;
        })}
        
        {/* Manecilla de hora (apuntando al 12) */}
        <line 
          x1="100" 
          y1="100" 
          x2="100" 
          y2="55" 
          stroke="currentColor" 
          strokeWidth="5" 
          strokeLinecap="round"
          opacity="0.7" 
        />
        
        {/* Manecilla de minuto (apuntando al 12) */}
        <line 
          x1="100" 
          y1="100" 
          x2="100" 
          y2="40" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round"
          opacity="0.7" 
        />
        
        {/* Centro del reloj */}
        <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.8" />
      </Box>

      {/* Taza de café (parte superior derecha) */}
      <Box
        component="svg"
        viewBox="0 0 150 150"
        sx={{
          position: 'absolute',
          top: '15%',
          right: '12%',
          width: '140px',
          height: '140px',
          opacity: 0.07,
        }}
      >
        {/* Taza */}
        <path d="M 40 60 L 45 100 L 95 100 L 100 60 Z" fill="currentColor" opacity="0.5" />
        <ellipse cx="70" cy="60" rx="30" ry="8" fill="currentColor" opacity="0.6" />
        <ellipse cx="70" cy="100" rx="25" ry="6" fill="currentColor" opacity="0.4" />
        
        {/* Asa */}
        <path d="M 100 70 Q 120 75 120 85 Q 120 95 100 90" 
              stroke="currentColor" 
              strokeWidth="6" 
              fill="none" 
              opacity="0.5" />
        
        {/* Vapor */}
        <path d="M 60 50 Q 58 40 60 30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
        <path d="M 70 48 Q 68 38 70 28" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
        <path d="M 80 50 Q 78 40 80 30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
      </Box>

      {/* Documento/Reporte (parte inferior izquierda) */}
      <Box
        component="svg"
        viewBox="0 0 180 180"
        sx={{
          position: 'absolute',
          bottom: '12%',
          left: '8%',
          width: '180px',
          height: '180px',
          opacity: 0.06,
          transform: 'rotate(-8deg)',
        }}
      >
        {/* Hoja de papel */}
        <rect x="40" y="30" width="100" height="130" rx="4" fill="currentColor" opacity="0.4" />
        <rect x="42" y="32" width="96" height="126" rx="3" fill="currentColor" opacity="0.2" />
        
        {/* Líneas de texto */}
        <line x1="50" y1="45" x2="90" y2="45" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <line x1="50" y1="55" x2="125" y2="55" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <line x1="50" y1="65" x2="110" y2="65" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <line x1="50" y1="75" x2="120" y2="75" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        
        {/* Gráfico de barras simple */}
        <rect x="55" y="110" width="12" height="30" fill="currentColor" opacity="0.5" />
        <rect x="72" y="95" width="12" height="45" fill="currentColor" opacity="0.5" />
        <rect x="89" y="105" width="12" height="35" fill="currentColor" opacity="0.5" />
        <rect x="106" y="90" width="12" height="50" fill="currentColor" opacity="0.5" />
        
        {/* Línea base del gráfico */}
        <line x1="50" y1="140" x2="125" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      </Box>

      {/* Puntos decorativos */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            opacity: 0.06,
          }}
        />
      ))}
    </Box>
  );
};

export default AuthVectors;