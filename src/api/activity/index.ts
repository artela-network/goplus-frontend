import constructGetUrl from '../../utils/constructGetUrl'
const getTaskListByAccount = async (account: string, id?: number) => {
    const response = await fetch(constructGetUrl(`https://campaign.artela.network/api/goplus/tasks`, { accountAddress: account, id }), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
}

const initTaskListByAccount = async (account: string, taskId: string = '1') => {
    const response = await fetch('https://campaign.artela.network/api/goplus/new-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accountAddress: account,
            taskId
        })
    })
    const data = await response.json();
    return data;
}

const updateTask = async (account: string, id: number,taskStatus:string,txs?:string) => {
    const response = await fetch('https://campaign.artela.network/api/goplus/update-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accountAddress: account,
            id,
            taskStatus,
            txs
        })
    })
    const data = await response.json();
    return data;
}
export { getTaskListByAccount, initTaskListByAccount, updateTask };