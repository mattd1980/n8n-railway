import { NpsSurveyRequest } from '../requests';
import { UserService } from '../services/user.service';
export declare class UserSettingsController {
    private readonly userService;
    constructor(userService: UserService);
    updateNpsSurvey(req: NpsSurveyRequest.NpsSurveyUpdate): Promise<void>;
}
