import type { ApexOptions } from "apexcharts";
import { useEffect } from "react";

declare global {
    interface Window {
        Apex?: ApexOptions;
    }
}

const useApexChartsDarkMode = (effectiveTheme: "dark" | "light" | undefined) => {
    console.log(effectiveTheme)
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Apex) {
            const isDark = effectiveTheme === 'dark';

            window.Apex = {
                chart: {
                    foreColor: isDark ? '#ffffff' : '#373d3f',
                    background: 'transparent',
                },
                theme: {
                    mode: effectiveTheme,
                },
                tooltip: {
                    theme: effectiveTheme,
                },
                grid: {
                    borderColor: isDark ? '#3f4447' : '#f1f5f9',
                },
                xaxis: {
                    labels: {
                        style: {
                            colors: isDark ? '#a0a0a0' : '#666666',
                        }
                    },
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: isDark ? '#a0a0a0' : '#666666',
                        }
                    },
                },
            };
        }
    }, [effectiveTheme]);
}

export default useApexChartsDarkMode