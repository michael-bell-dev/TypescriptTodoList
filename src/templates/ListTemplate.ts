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

            // const label = document.createElement('label') as HTMLLabelElement;
            // label.htmlFor = item.id;
            // label.textContent = item.item;
            // li.append(label);
            const input = document.createElement('input') as HTMLInputElement;
            input.type = 'text';
            input.value = item.item;
            input.className = 'edit-input';
            input.style.display = 'none';

            input.addEventListener('blur', () => {
                fullList.editItem(item.id, input.value);
                this.render(fullList);
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

            li.append(content);
            li.append(button);

            this.ul.append(li);
        })
    }
}