import * as fs from 'fs/promises';
import * as path from 'path';

async function createDebugWorkspace() {
  try {
    const rootDir = process.cwd();
    const workspaceDir = path.join(rootDir, 'debug-workspace');
    const subdirPath = path.join(workspaceDir, 'subdir');
    try {
      await fs.rm(workspaceDir, { recursive: true, force: true });
      console.log('Existing debug-workspace directory removed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    await fs.mkdir(workspaceDir);
    console.log('Created debug-workspace directory');
    await fs.mkdir(subdirPath);

    await fs.mkdir(path.join(subdirPath, 'subsubdir'));
    console.log('Created subdir directory');
    const files = [
      {
        path: path.join(subdirPath, 'file1.txt'),
        content: 'Hello, World!'
      },
      {
        path: path.join(subdirPath, 'file2.txt'),
        content: 'Goodbye, World!'
      },
      {
        path: path.join(workspaceDir, 'file3.txt'),
        content: 'Hello, Goodbye, World!'
      },
      {
        path: path.join(subdirPath, 'subsubdir', 'file4.txt'),
        content: 'Hello, Goodbye, World!'
      }
    ];

    await Promise.all(files.map(async (file) => {
      await fs.writeFile(file.path, file.content, 'utf8');
      console.log(`Created file: ${path.relative(rootDir, file.path)}`);
    }));

    console.log('Debug workspace setup completed successfully');
  } catch (error) {
    console.error('Error creating debug workspace:', error);
    process.exit(1);
  }
}

createDebugWorkspace();
