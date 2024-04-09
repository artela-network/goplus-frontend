import constructGetUrl from './constructGetUrl'

export interface Response {
  data?: Data
  error?: string
  success: boolean
}

export interface Data {
  accountAddress: string
  status: number
  canSync: boolean
  taskInfos: TaskInfo[]
}

export interface TaskInfo {
  id: number
  taskName: string
  taskStatus: number
  memo: string
  title: string
  txs: string,
  taskId:string
}

export interface UpdateTaskRequest {
  id: number
  accountAddress: string
  txs: string
}

export class CampaignClient {
  private static readonly baseUrl = 'https://campaign.artela.network/api/goplus'

  static async initTask(account: string): Promise<Response> {
    if (!account) {
      throw new Error('Account is required')
    }

    const response = await fetch(`${CampaignClient.baseUrl}/new-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountAddress: account, channelTaskId: '1' })
    })
    return await response.json()
  }

  static async getTasksByAccount(account: string, taskId?: number): Promise<Response> {
    if (!account) {
      throw new Error('Account is required')
    }

    const params: any = {
      accountAddress: account
    }
    if (taskId) {
      params.taskId = taskId
    }

    const response = await fetch(constructGetUrl(`${CampaignClient.baseUrl}/tasks`, params), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  }

  static async updateTask(request: UpdateTaskRequest): Promise<Response> {
    console.log(`updating task: ${JSON.stringify(request)}`)
    const response = await fetch(`${CampaignClient.baseUrl}/update-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    return await response.json()
  }
}
