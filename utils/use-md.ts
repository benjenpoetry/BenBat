import { remark } from 'remark';
export function getTextByCode (code: string) {
    const result = remark.parse(code);
    const children = result.children;
    const heading = children[0];
    if (heading.type === 'heading' && heading.depth === 1) {
        const text = heading.children[0];
        if (text.type === 'text') {
            return text.value;
        }
    }
    throw new Error('No text');
}
