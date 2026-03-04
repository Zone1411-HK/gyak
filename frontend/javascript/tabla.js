document.addEventListener('DOMContentLoaded', () => {
    generateTable();
    document.querySelector('#removeKaja').addEventListener('click', removeKaja);
});

async function generateTable() {
    const tbody = document.querySelector('tbody');
    tbody.replaceChildren();
    const { kajak } = await Get('/api/kajak');
    for (const kaja of kajak) {
        const tr = document.createElement('tr');
        tr.dataset.id = kaja.id;
        for (const info of Object.values(kaja)) {
            const td = document.createElement('td');
            td.innerText = info;
            tr.appendChild(td);
        }
        tr.addEventListener('click', selectRow);
        tbody.appendChild(tr);
    }
}

function selectRow() {
    const trs = document.querySelectorAll('tr');
    for (const tr of trs) {
        if (tr.dataset.selected == 'true') {
            tr.classList.remove('selected');
            tr.removeAttribute('data-selected');
        }
    }
    this.dataset.selected = 'true';
    this.classList.add('table-active');
}

async function removeKaja() {
    const selectedId = document.querySelector('tr[data-selected="true"]').dataset.id;
    await Post('/api/removeKaja/' + selectedId);
    generateTable();
}

async function Get(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(res.status + ' ' + res.statusText);
        }
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function Post(url, data) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
        if (!res.ok) {
            throw new Error(res.status + ' ' + res.statusText);
        }
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
}
