import { TimeZones } from "./timeZones";
import { ObjectId } from "mongodb";

export enum WorkTypes {
  Focus = "Focus",
  Break = "Break",
  Tea = "Tea",
  Lunch = "Lunch",
  Breakfast = "Breakfast",
  Meeting = "Meeting",
}

export enum Priority {
  high = 1,
  medium,
  low,
}

export enum Statuses {
  NotStarted,
  Active,
  OnHold,
  Completed,
}

export interface Time {
  hour: number;
  minute: number;
  timeZone: TimeZones;
}

export enum Frequency {
  Once = "Once",
  EveryDay = "EveryDay",
  EveryWeek = "EveryWeek",
  EveryMonthDate = "EveryMonthDate",
  EveryMonthDay = "EveryMonthDay",
  SpecificDates = "SpecificDates",
}

export enum Days {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
}

export interface IEveryMonthDay {
  weekNo: number;
  day: Days;
}

interface IOnceFrequency {
  type: Frequency.Once;
  value: Date;
}

interface IEveryDayFrequency {
  type: Frequency.EveryDay;
  startDate: Date;
  endDate: Date;
}

interface IEveryWeekFrequency {
  type: Frequency.EveryWeek;
  value: Days[];
  startDate: Date;
  endDate: Date;
}

interface IEveryMonthDateFrequency {
  type: Frequency.EveryMonthDate;
  value: number[];
  startDate: Date;
  endDate: Date;
}

interface IEveryMonthDayFrequency {
  type: Frequency.EveryMonthDay;
  value: IEveryMonthDay[];
  startDate: Date;
  endDate: Date;
}

interface ISpecificDatesFrequency {
  type: Frequency.SpecificDates;
  value: Date[];
}

export type FrequencyType =
  | IOnceFrequency
  | IEveryDayFrequency
  | IEveryWeekFrequency
  | IEveryMonthDateFrequency
  | ISpecificDatesFrequency
  | IEveryMonthDayFrequency;

export enum OrganizationRole {
  Member = "member",
  Admin = "Admin",
}

export enum DayPlanStatus {
  Inactive,
  Active,
  Draft,
}

export enum TimeLogStatus {
  InProgress = 1,
  Completed = 2,
  Cancelled = 3,
}

export type idType = string | ObjectId;
