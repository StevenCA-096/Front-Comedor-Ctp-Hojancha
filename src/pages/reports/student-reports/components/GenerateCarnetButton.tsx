import type { StudentReportDto } from "@/types/student/dto/student-report.dto";
import { Button, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import Barcode from "react-barcode";
import carnetTemplate from "@assets/images/carnet/carnet_template.jpeg";
import useGetStudentFiles from "@/hooks/files/queries/useGetStudentFiles";
import { refreshToken } from "@/services/auth/authService";

const GenerateCarnetButton = ({
  studentData,
}: {
  studentData: StudentReportDto;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barcodeContainerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: filePaths } = useGetStudentFiles(parseInt(studentData.cedula));

  //Generates the carnet
  const handleGenerateCarnet = async () => {
    if (isGenerating) return; // Prevenir clics múltiples
    
    setIsGenerating(true);
    
    try {
      const canvas = canvasRef.current;

      if (!canvas) {
        throw new Error("Canvas no disponible");
      }

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("No se pudo obtener el contexto del canvas");
      }

      // Dimensiones del carnet
      canvas.width = 2134;
      canvas.height = 1416;

      // Cargar imagen de fondo
      const backgroundImg = new Image();
      backgroundImg.src = carnetTemplate;

      backgroundImg.onload = async () => {
        // Dibujar fondo
        context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

        // Configuración de texto
        context.fillStyle = "rgba(255, 255, 255, 0.75)";
        context.shadowColor = "rgba(0, 0, 0, 0.5)";
        context.shadowBlur = 10;

        const labelFont = 'bold 45px "Roboto", sans-serif';
        const valueFont = 'bold 60px "Roboto", sans-serif';
        const nameValueFont = 'bold 65px "Roboto", sans-serif';
        const labelColor = "rgba(255, 255, 255, 0.75)";
        const valueColor = "rgba(255, 255, 255, 0.85)";

        const initialTextX = 120;
        const initialTextY = 1200;
        const lineSpacing = 180;

        const drawLabeledText = (
          label: string,
          value: string,
          x: number,
          y: number,
          isName = false
        ) => {
          // Dibujar etiqueta
          context.fillStyle = labelColor;
          context.font = labelFont;
          context.fillText(label, x, y);

          // Dibujar valor
          context.font = isName ? nameValueFont : valueFont;
          context.fillStyle = valueColor;
          context.fillText(value, x + 20, y + 80);
        };

        const fullName = `${studentData.name} ${studentData.lastName1} ${studentData.lastName2}`;

        // Dibujar información del estudiante
        drawLabeledText(
          "Estudiante:",
          fullName,
          initialTextX,
          initialTextY - lineSpacing * 3,
          true
        );

        drawLabeledText(
          "Cédula:",
          studentData.cedula.toString(),
          initialTextX,
          initialTextY - lineSpacing * 2
        );

        drawLabeledText(
          "Grado:",
          studentData.grade || "Por definir",
          initialTextX,
          initialTextY - lineSpacing
        );

        drawLabeledText(
          "Sección:",
          studentData.sectionName || "Por definir",
          initialTextX,
          initialTextY
        );

        // Convertir SVG del código de barras a imagen
        if (barcodeContainerRef.current) {
          const svgElement = barcodeContainerRef.current.querySelector("svg");

          if (svgElement) {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], {
              type: "image/svg+xml;charset=utf-8",
            });
            const svgUrl = URL.createObjectURL(svgBlob);

            const barcodeImg = new Image();
            barcodeImg.src = svgUrl;

            await new Promise<void>((resolve) => {
              barcodeImg.onload = () => {
                // Dibujar código de barras en la esquina inferior derecha
                const barcodeWidth = 400;
                const barcodeHeight = 120;
                const barcodeX = canvas.width - barcodeWidth - 60;
                const barcodeY = canvas.height - barcodeHeight - 40;

                // Fondo blanco para el código de barras
                context.fillStyle = "#ffffff";
                context.shadowBlur = 0;
                context.fillRect(
                  barcodeX - 10,
                  barcodeY - 10,
                  barcodeWidth + 20,
                  barcodeHeight + 20
                );

                // Dibujar código de barras
                context.drawImage(
                  barcodeImg,
                  barcodeX,
                  barcodeY,
                  barcodeWidth,
                  barcodeHeight
                );

                URL.revokeObjectURL(svgUrl);
                resolve();
              };
            });
          }
        }

        try {
          // Refreshes token in case is expired
          await refreshToken();
          // Cargar foto del estudiante con autenticación
          const response = await fetch(getStudentPhoto(), {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Error al cargar la foto: ${response.status}`);
          }

          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);

          const studentImg = new Image();
          studentImg.src = imageUrl;

          studentImg.onload = () => {
            // Configuración del círculo para la foto
            const circleX = 970;
            const circleY = 600;
            const circleDiameter = 620;
            const borderThickness = 20;

            // Dibujar borde del círculo
            context.beginPath();
            context.arc(
              circleX + circleDiameter / 2,
              circleY + circleDiameter / 2,
              circleDiameter / 2 + borderThickness,
              0,
              Math.PI * 2
            );
            context.fillStyle = "#123B6D";
            context.shadowColor = "rgba(0, 0, 0, 0.4)";
            context.shadowBlur = 20;
            context.fill();
            context.closePath();

            // Recortar imagen en círculo
            context.save();
            context.beginPath();
            context.arc(
              circleX + circleDiameter / 2,
              circleY + circleDiameter / 2,
              circleDiameter / 2,
              0,
              Math.PI * 2
            );
            context.closePath();
            context.clip();

            // Dibujar foto del estudiante
            context.drawImage(
              studentImg,
              circleX,
              circleY,
              circleDiameter,
              circleDiameter
            );
            context.restore();

            // Generar y descargar imagen
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `CARNET_${studentData.cedula}.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }
                setIsGenerating(false); // Finalizar loading
              },
              "image/png",
              1.0
            );

            // Limpiar URL temporal
            URL.revokeObjectURL(imageUrl);
          };

          studentImg.onerror = () => {
            setIsGenerating(false);
            throw new Error("Error al cargar la foto del estudiante");
          };
        } catch (photoError) {
          console.warn("No se pudo cargar la foto:", photoError);

          // Generar carnet sin foto
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `CARNET_${studentData.cedula}_SIN_FOTO.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }
              setIsGenerating(false); // Finalizar loading
            },
            "image/png",
            1.0
          );
        }
      };

      backgroundImg.onerror = () => {
        setIsGenerating(false);
        throw new Error("Error al cargar la plantilla del carnet");
      };
    } catch (error) {
      console.error("Error generando el carnet:", error);
      setIsGenerating(false); // Finalizar loading en caso de error
    }
  };

  const getStudentPhoto = (): string => {
    const photoFile = filePaths?.find((file) =>
      file.includes("Foto_Tamaño_Pasaporte")
    );
    return photoFile || "https://via.placeholder.com/200";
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div
        ref={barcodeContainerRef}
        style={{ position: "absolute", left: "-9999px" }}
      >
        <Barcode
          value={studentData.cedula.toString()}
          format="CODE128"
          width={2}
          height={60}
          fontSize={16}
          background="#ffffff"
          lineColor="#000000"
        />
      </div>
      <Button
        onClick={handleGenerateCarnet}
        variant="contained"
        disabled={isGenerating}
        startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : null}
        sx={{ color: "white", fontWeight: "bold" }}
      >
        {isGenerating ? "Generando carnet..." : "Generar carnet"}
      </Button>
    </>
  );
};

export default GenerateCarnetButton;