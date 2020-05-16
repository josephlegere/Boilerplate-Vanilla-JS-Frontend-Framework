import { Page } from '../../essentials';
import tableView from './table-view';
import './table.scss';

export default class Table extends Page {

    constructor(path) {
        super('table', tableView);
    }
}