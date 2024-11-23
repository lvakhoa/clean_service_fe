type Helper = {
  id: string;
  experienceDescription: string;
  resumeUploaded: any;
  servicesOffered: string[];
  hourlyRate: number;
  averageRating: number;
  completedJobs: number;
  cancelledJobs: number;
  gender: string;
  profilePicture: string;
  identityCard: string;
  fullName: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  email?: string;
};

type EmployeeRowProps = {
  id: string;
  experienceDescription: string;
  resumeUploaded: any;
  servicesOffered: string[];
  hourlyRate: number;
  averageRating: number;
  completedJobs: number;
  cancelledJobs: number;
  gender: string;
  profilePicture: any;
  fullName: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  email?: string;
};
