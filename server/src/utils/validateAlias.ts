export function isValidAlias( alias: string ) {
    const pattern = /^[a-zA-Z0-9-]+$/;
    return pattern.test(alias);
  }
  