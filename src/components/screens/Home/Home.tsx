import React, { useEffect } from "react";
import Carrousel from "../../ui/Carrousel/Carrousel";
import { SliderGenerico } from "../../ui/ItemSlider/ItemSlider";
import { ErrorBoundary } from "../../ui/ErrorBoundary/ErrorBoundary";
import { ICategoria, ISucursal } from "../../../types/empresa";
import { useFetch } from "../../../hooks/UseFetch";
import { LinearProgress, Stack, Box, Typography } from "@mui/material";
import { useAppDispatch } from "../../../redux/HookReducer";
import { setSucursal } from "../../../redux/slices/SelectedData";
import styles from "./Home.module.css";

export const Home: React.FC = () => {
  const {
    data: sucursales,
    loading: loadingSucursal,
    error: errorSucursal,
  } = useFetch<ISucursal[]>("/sucursales");
  const {
    data: categorias,
    loading: loadingCategoria,
    error: errorCategoria,
  } = useFetch<ICategoria[]>("/categorias");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sucursales) {
      const randomSucursal =
        sucursales[Math.floor(Math.random() * sucursales.length)];
      dispatch(setSucursal(randomSucursal));
      console.log("sucursal obtenida: ", randomSucursal);
    }
  }, [sucursales, dispatch]);

  if (errorSucursal || errorCategoria) return <h1>Error :c</h1>;

  return (
    <Box className={styles.homeContainer}>
      <ErrorBoundary><Carrousel /></ErrorBoundary>
      <Stack spacing={8} paddingTop={8}>
        {/* Slider de Categorias */}
        <Typography variant="h6">Categorías</Typography>
        {!loadingCategoria && categorias && categorias.length > 0 ? (
          <ErrorBoundary>
            <SliderGenerico items={categorias} />
          </ErrorBoundary>
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
        {/* Slider de Sucursales */}
        <Typography variant="h6">Sucursales</Typography>
        {!loadingSucursal && sucursales && sucursales.length > 0 ? (
          <ErrorBoundary>
            <SliderGenerico items={sucursales} />
          </ErrorBoundary>
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
      </Stack>
    </Box>
  );
};
