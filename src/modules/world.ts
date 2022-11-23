export function parseWorld(world: string) {
    const worldNumber = world.replace(/\D/g, '');
    if (world.startsWith('c')) return `Clássico ${worldNumber}`;
    if (world.startsWith('p')) return `Casual ${worldNumber}`;
    return `Mundo ${worldNumber}`;
};