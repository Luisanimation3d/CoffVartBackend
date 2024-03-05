import {processesModel} from "../models/processes.model";
import {processes} from "../utils/processes";

export function processesSeeder () {
    try {
        processes.forEach((element) => {
            processesModel.create({
                name: element.name,
                description: element.description
            })
        });
        return true;
    }catch (e) {
        console.log(e);
        return false
    }
}