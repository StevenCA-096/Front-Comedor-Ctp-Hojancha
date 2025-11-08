import useThemeStore from "@/stores/theme/themeStore"

const useIsDarkMode = () => {
  return useThemeStore().getEffectiveTheme() != 'light'
}

export default useIsDarkMode