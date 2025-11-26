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
      {/* Computadora (parte inferior derecha) */}
      <Box
        component="svg"
        viewBox="0 0 200 200"
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '8%',
          width: '250px',
          height: '250px',
          opacity: 0.15,
        }}
      >
        {/* Pantalla */}
        <rect x="30" y="30" width="140" height="90" rx="4" fill="currentColor" opacity="0.3" />
        <rect x="40" y="40" width="120" height="70" fill="currentColor" opacity="0.5" />
        
        {/* Líneas de código en pantalla */}
        <line x1="50" y1="55" x2="90" y2="55" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        <line x1="50" y1="65" x2="120" y2="65" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        <line x1="50" y1="75" x2="80" y2="75" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        <line x1="50" y1="85" x2="110" y2="85" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        <line x1="50" y1="95" x2="95" y2="95" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        
        {/* Base de la pantalla */}
        <rect x="85" y="120" width="30" height="20" fill="currentColor" opacity="0.4" />
        
        {/* Teclado */}
        <rect x="20" y="145" width="160" height="40" rx="4" fill="currentColor" opacity="0.3" />
        
        {/* Teclas del teclado */}
        {[...Array(8)].map((_, i) => (
          <rect 
            key={`key-row1-${i}`}
            x={30 + i * 18} 
            y="152" 
            width="15" 
            height="8" 
            rx="1" 
            fill="currentColor" 
            opacity="0.5" 
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <rect 
            key={`key-row2-${i}`}
            x={30 + i * 18} 
            y="163" 
            width="15" 
            height="8" 
            rx="1" 
            fill="currentColor" 
            opacity="0.5" 
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <rect 
            key={`key-row3-${i}`}
            x={40 + i * 18} 
            y="174" 
            width="15" 
            height="8" 
            rx="1" 
            fill="currentColor" 
            opacity="0.5" 
          />
        ))}
      </Box>

      {/* Libros apilados (parte superior izquierda) */}
      <Box
        component="svg"
        viewBox="0 0 200 200"
        sx={{
          position: 'absolute',
          top: '8%',
          left: '5%',
          width: '220px',
          height: '220px',
          opacity: 0.12,
        }}
      >
        {/* Libro 1 (base) */}
        <rect x="40" y="120" width="100" height="15" rx="2" fill="currentColor" opacity="0.6" />
        <rect x="42" y="122" width="96" height="11" fill="currentColor" opacity="0.3" />
        <line x1="90" y1="122" x2="90" y2="133" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        
        {/* Libro 2 */}
        <rect x="45" y="100" width="90" height="18" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="47" y="102" width="86" height="14" fill="currentColor" opacity="0.3" />
        <line x1="90" y1="102" x2="90" y2="116" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        
        {/* Libro 3 */}
        <rect x="50" y="82" width="85" height="16" rx="2" fill="currentColor" opacity="0.55" />
        <rect x="52" y="84" width="81" height="12" fill="currentColor" opacity="0.3" />
        <line x1="92" y1="84" x2="92" y2="96" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        
        {/* Libro 4 (inclinado) */}
        <g transform="rotate(-15 150 110)">
          <rect x="140" y="100" width="70" height="14" rx="2" fill="currentColor" opacity="0.5" />
          <rect x="142" y="102" width="66" height="10" fill="currentColor" opacity="0.3" />
          <line x1="175" y1="102" x2="175" y2="112" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        </g>
        
        {/* Marcapáginas */}
        <rect x="55" y="75" width="4" height="12" fill="currentColor" opacity="0.6" />
        <rect x="120" y="92" width="4" height="10" fill="currentColor" opacity="0.6" />
      </Box>

      {/* Elementos decorativos adicionales */}
      
      {/* Lápiz (cerca de los libros) */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        sx={{
          position: 'absolute',
          top: '25%',
          left: '18%',
          width: '80px',
          height: '80px',
          opacity: 0.1,
          transform: 'rotate(145deg)',
        }}
      >
        <rect x="20" y="45" width="60" height="8" fill="currentColor" opacity="0.6" />
        <polygon points="80,49 90,45 90,53" fill="currentColor" opacity="0.7" />
        <rect x="18" y="46" width="4" height="6" fill="currentColor" opacity="0.8" />
      </Box>

      {/* Cursor/Mouse pointer (cerca de la computadora) */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        sx={{
          position: 'absolute',
          bottom: '28%',
          right: '22%',
          width: '60px',
          height: '60px',
          opacity: 0.1,
        }}
      >
        <polygon points="30,20 30,70 45,55 55,75 65,70 55,50 75,45" fill="currentColor" opacity="0.7" />
      </Box>

      {/* Íconos de código flotantes */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          fontSize: '80px',
          opacity: 0.08,
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: 'currentColor',
        }}
      >
        {'</>'}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '12%',
          fontSize: '60px',
          opacity: 0.08,
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: 'currentColor',
        }}
      >
        {'{}'}
      </Box>

      {/* Puntos decorativos conectores */}
      {[...Array(15)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            opacity: 0.1,
          }}
        />
      ))}
    </Box>
  );
};

export default AuthVectors;