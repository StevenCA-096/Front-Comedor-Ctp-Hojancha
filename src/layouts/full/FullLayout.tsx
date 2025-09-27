import { useState } from "react";
import { styled, Box, Typography, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import useIsMobile from "@/hooks/isMobile/useIsMobile";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

const FullLayout = () => {
  const isMobile = useIsMobile()

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(isMobile? false : true);

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header
          toogleSideBar={() => setSidebarOpen(!isSidebarOpen)}
        />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
          <Outlet />
        </Box>

        {/* ------------------------------------------- */}
        {/* End Page */}
        {/* ------------------------------------------- */}
        <Box sx={{ pt: 6, pb: 3, display: 'flex', justifyContent: 'center' }}>
          <Typography>
            Sistema de comedor Colegio Técnico Profesional de Hojancha
          </Typography>

        </Box>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
