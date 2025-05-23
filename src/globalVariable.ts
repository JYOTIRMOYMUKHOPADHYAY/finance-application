
export const USERTYPE_ID = {
    REVIEWER: 4,
    ADMIN : 3,
    STAFF: 2,
    CUSTOMER: 1
}


export type StatusType = {
    PENDING: string,
    ASSIGNED : string,
    ACCEPTED : string,
    SUBMITTED : string,
    COMPLETED : string,
    REJECTED : string,
    VERIFIED : string
  };
// CREATE TYPE status_enum AS ENUM ('PENDING', 'ASSIGNED', 'ACCEPTED', 'SUBMITTED', 'COMPLETED', 'REJECTED');
export const STATUS : StatusType = {
    PENDING : 'PENDING',
    ASSIGNED : 'ASSIGNED',
    ACCEPTED : 'ACCEPTED',
    SUBMITTED : 'SUBMITTED',
    COMPLETED : 'COMPLETED',
    REJECTED : 'REJECTED',
    VERIFIED : 'VERIFIED'
}