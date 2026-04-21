import FullList from '../model/FullList';

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement;

    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById('listItems') as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();

        fullList.list.forEach(item => {
            this.ul.addEventListener('dragover', (e: DragEvent) => {
                e.preventDefault();
            });

            const li = document.createElement('li') as HTMLLIElement;
            li.className = 'item';

            const check = document.createElement('input') as HTMLInputElement;
            check.type = 'checkbox';
            check.id = item.id;
            check.tabIndex = 0;
            check.checked = item.checked;

            check.addEventListener('change', () => {
                item.checked = check.checked;
                fullList.save();
            })

            const input = document.createElement('input') as HTMLInputElement;
            input.type = 'text';
            input.value = item.item;
            input.className = 'edit-input';
            input.style.display = 'none';

            input.addEventListener('blur', () => {
                saveEdit();
            });

            input.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    saveEdit();
                }

                if (e.key === 'Escape') {
                    cancelEdit();
                }
            });

            const label = document.createElement('span');
            label.textContent = item.item;
            label.className = 'label';

            label.addEventListener('click', () => {
                label.style.display = 'none';
                input.style.display = 'inline-block';
                input.focus();
            });

            const button = document.createElement('button') as HTMLButtonElement;
            button.className = 'button';
            button.textContent = 'X';

            button.addEventListener('click', () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            })

            const content = document.createElement('div');
            content.className = 'content';

            content.append(check);
            content.append(label);
            content.append(input);

            li.draggable = true;
            li.dataset.id = item.id;

            li.addEventListener('dragstart', (e: DragEvent) => {
                if (!e.dataTransfer) return;
                e.dataTransfer.setData('text/plain', item.id);
            });

            li.append(content);
            li.append(button);

            this.ul.append(li);

            let isCancelled = false;

            const saveEdit = () => {
                if (isCancelled) return;
                fullList.editItem(item.id, input.value);
                this.render(fullList);
            };

            const cancelEdit = () => {
                isCancelled = true;
                this.render(fullList);
            };
        })

        this.ul.ondrop = (e: DragEvent) => {
            e.preventDefault();
            if (!e.dataTransfer) return;

            const draggedId = e.dataTransfer.getData('text/plain');

            const target = (e.target as HTMLElement).closest('li') as HTMLLIElement;
            if (!target) return;

            const targetId = target.dataset.id;
            if (!targetId || draggedId === targetId) return;

            fullList.reorder(draggedId, targetId);
            this.render(fullList);
        };
    }
}