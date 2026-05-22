import { CUSTOM_FONTS } from "../constants";

/**
 * Waits for custom fonts to be loaded before proceeding
 * This prevents layout shifts and ensures text animations work correctly
 *
 * @param {string[]} [fontFamilies] - Array of font family names to wait for (defaults to CUSTOM_FONTS)
 * @returns {Promise<boolean>} - Resolves to true when fonts are ready
 */
export async function waitForFonts(fontFamilies = CUSTOM_FONTS) {
  try {
    await document.fonts.ready;

    const fontCheckPromises = fontFamilies.map((fontFamily) => {
      return document.fonts.check(`16px ${fontFamily}`);
    });

    await Promise.all(fontCheckPromises);
    await new Promise((resolve) => setTimeout(resolve, 100));

    return true;
  } catch (error) {
    // Fallback delay if font check fails
    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
  }
}
