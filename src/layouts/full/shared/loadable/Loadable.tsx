import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import {  Suspense, type ComponentType } from "react";

// 👇 Tipamos correctamente el componente y las props
const Loadable =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => (
    <Suspense fallback={<LoadingScreen sx={{height:'100dvh'}}/>}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
