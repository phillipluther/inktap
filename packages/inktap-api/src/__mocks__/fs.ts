export function existsSync(filepath: string) {
  return /FAIL\:existsSync/.test(filepath) ? false : true;
}
