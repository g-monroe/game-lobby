/* eslint-disable */
import { APIHandler } from "./apiHandler";
import RequestRequest from "../Entities/GoalEntity";
import GoalEntity from "../Entities/GoalEntity";

export interface IGoalHandler {
    getGoalByToday() : Promise<GoalEntity>;
    getGoalFake() : Promise<GoalEntity>;
}

export class GoalHanlder implements IGoalHandler {
    
    async getGoalByToday() : Promise<GoalEntity> {
        return await APIHandler(`server/api/Goal/Today`,{
            headers: {"Content-Type" : "application/json"},
            method:'GET',
            responseType:GoalEntity
        });
    }
    async getGoalFake() : Promise<GoalEntity> {
        return await APIHandler(`../FakeMaterials/Goal.json`,{
            headers: {"Content-Type" : "application/json"},
            method:'GET',
            responseType:GoalEntity
        });
    }
}