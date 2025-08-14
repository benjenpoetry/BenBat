import fs from 'fs';
import path, { extname } from 'path';

export interface Struct {
    link: string;
    items?: Struct[];
}

const excludeFolders: string[] = ['utils', '.vitepress', 'node_modules'];
const excludeFiles: string[] = ['index.md', 'README.md', 'README.zh_Cn.md'];
export function genStructs (dirPath: string, basePath: string = dirPath) {
    const result: Struct[] = [];
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && excludeFolders.some(it => it === item)) {
            continue;
        }
        if (excludeFiles.some(it => it === item)) {
            continue;
        }
        if (extname(item) === '.md') {
            const relativePath = path.relative(basePath, fullPath);
            const link = '/' + relativePath.replace(/\\/g, '/');
            if (stat.isDirectory()) {
                result.push({
                    link,
                    items: genStructs(fullPath, basePath)
                });
            } else if (stat.isFile()) {
                result.push({
                    link
                });
            }
        }
    }
    return result;
}
