import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch (error) {
    console.error(error);
  }

  await fs.promises.unlink(filename);
};
