#!/usr/bin/env python3
import os
import argparse

def generate_tree(root_path, prefix='', exclude=None):
    """Рекурсивно генерує ASCII-дерево для папок і файлів, з виключенням."""
    if exclude is None:
        exclude = []
    entries = sorted(os.listdir(root_path))
    # відфільтрувати виключені каталоги/файли
    entries = [e for e in entries if e not in exclude]
    pointers = ['├── '] * (len(entries) - 1) + ['└── ']
    for pointer, entry in zip(pointers, entries):
        path = os.path.join(root_path, entry)
        print(f"{prefix}{pointer}{entry}")
        if os.path.isdir(path):
            extension = '│   ' if pointer == '├── ' else '    '
            generate_tree(path, prefix + extension, exclude)

def main():
    parser = argparse.ArgumentParser(
        description="Зчитує та виводить ASCII-структуру каталогу без каталогу кешу, .git та node_modules")
    parser.add_argument(
        'directory',
        nargs='?',
        default='.',
        help="Шлях до кореневого каталогу (за замовчуванням — поточний)")
    parser.add_argument(
        '-o', '--output',
        metavar='FILE',
        help="Записати результат у текстовий файл")
    parser.add_argument(
        '-e', '--exclude',
        nargs='+',
        default=['.cache', 'cache', '.git', 'node_modules'],
        help="Каталоги або файли, які не включати в дерево")
    args = parser.parse_args()

    os.chdir(args.directory)

    from io import StringIO
    import sys

    buffer = StringIO()
    sys_stdout = sys.stdout
    sys.stdout = buffer

    generate_tree('.', exclude=args.exclude)

    sys.stdout = sys_stdout
    result = buffer.getvalue()

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(result)
        print(f"Структуру каталогу записано у «{args.output}»")
    else:
        print(result)

if __name__ == '__main__':
    main()
