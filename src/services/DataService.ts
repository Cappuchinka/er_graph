import { InputJSON } from '../types/json.types.ts';
import { RequestService } from './RequestService.ts';
import config from '../../config.ts';

export default class DataService {
    public static getERModel(): Promise<InputJSON> {
        return RequestService.get<InputJSON>(`${config.er_graph_host}`)
    }
}