export class AgentNoticeBoard {

    Id: number;
    Title: string;
    Message: string;
    MessageType: string;
    InsertedDate: string;
    InsertedDateTime: string;
    InsertedBy: string;
    UpdatedDateTime: string | null;
    UpdatedBy: string | null;
    IsActive: boolean;
    constructor() {
        this.Id = 0;
        this.Title = '';
        this.Message = '';
        this.MessageType = '';
        this.InsertedDate = '';
        this.InsertedDateTime = '';
        this.InsertedBy = '';
        this.UpdatedDateTime = null;
        this.UpdatedBy = null;
        this.IsActive = false;
      }

}


