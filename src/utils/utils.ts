import crypto from "crypto";

// Function to hash a password
const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate a random salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
};

// Function to verify a password
const verifyPassword = (password: string, hash: string, salt: string) => {
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === hashToVerify;
};

const sanitizeFileName = (fileName: string) => {
  return fileName.replace(/\s+/g, "_");
};

type Application = {
  id: number;
  user_id: number;
  service_id: number;
  sub_service_id: number;
  mobileno: string;
  mailid: string;
  message: string;
  filelink: string;
  status: string;
  created_date: string;
  service_name: string;
  sub_service_name: string;
};

type GroupedData = {
  service_id: number;
  service_name: string;
  data: {
    sub_service_id: number;
    sub_service_name: string;
    data: Omit<
      Application,
      "service_id" | "service_name" | "sub_service_id" | "sub_service_name"
    >[];
  }[];
};
const groupApplicationsByService = (applications: any[]): any[] => {
  const serviceMap = new Map<number, any>();

  applications.forEach((app) => {
    if (!serviceMap.has(app.service_id)) {
      serviceMap.set(app.service_id, {
        service_id: app.service_id,
        service_name: app.service_name,
        data: [],
      });
    }

    const service = serviceMap.get(app.service_id)!;

    let subService = service.data.find((sub:any) => sub.sub_service_id === app.sub_service_id);
    if (!subService) {
      subService = {
        sub_service_id: app.sub_service_id,
        sub_service_name: app.sub_service_name,
        data: [],
      };
      service.data.push(subService);
    }

    subService.data.push({
      id: app.id,
      user_id: app.user_id,
      user_name: app.user_name,       // Added user details
      user_email: app.user_email,     // Added user details
      user_phone: app.user_phone,     // Added user details
      mobileno: app.mobileno,
      mailid: app.mailid,
      periodId: app.periodId,         // Added periodId
      message: app.message,
      filelink: app.filelink,
      isDeleted: app.isDeleted,       // Added isDeleted field
      status: app.status,
      created_date: app.created_date,
    });
  });

  return Array.from(serviceMap.values());
};


export {
  hashPassword,
  verifyPassword,
  sanitizeFileName,
  groupApplicationsByService,
};
