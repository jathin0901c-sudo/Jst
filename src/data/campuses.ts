import { CampusLocation } from '../types';

export const CAMPUSES: CampusLocation[] = [
  {
    id: 'dtu-delhi',
    city: 'Delhi NCR',
    name: 'Delhi Technological University (DTU, Rohini)',
    code: 'DTU-01',
    hostels: [
      'C.V. Raman Hostel (B-1)',
      'Sir Visvesvaraya Hostel (B-2)',
      'Aryabhatta Hall (B-3)',
      'Bhagirathi Hostel (Girls Block)',
      'Kalpana Chawla Hall',
      'Type 2 Staff / Hostels'
    ],
    expressTimeMins: 45,
    runnerStation: 'Bawana Road Hub #4'
  },
  {
    id: 'iit-delhi',
    city: 'Delhi NCR',
    name: 'IIT Delhi (Hauz Khas)',
    code: 'IITD-02',
    hostels: [
      'Nilgiri Hostel',
      'Karakoram Hostel',
      'Aravali Hostel',
      'Jwalamukhi Hostel',
      'Kailash Hostel (Girls)',
      'Himadri Hostel (Girls)',
      'Girnar Hostel'
    ],
    expressTimeMins: 35,
    runnerStation: 'SDA Market Arc Hub #1'
  },
  {
    id: 'du-north',
    city: 'Delhi NCR',
    name: 'DU North Campus (SRCC / Hansraj / Hindu / KMC)',
    code: 'DU-NC-03',
    hostels: [
      'SRCC Boys Hostel',
      'SRCC Girls Hostel',
      'Hansraj Boys Hostel',
      'Hindu College Hostel',
      'Gwyer Hall',
      'Jubilee Hall',
      'Kamla Nagar PG Cluster'
    ],
    expressTimeMins: 40,
    runnerStation: 'Hudson Lane Pod #7'
  },
  {
    id: 'nsut-delhi',
    city: 'Delhi NCR',
    name: 'NSUT (Dwarka Sector 3)',
    code: 'NSUT-04',
    hostels: [
      'Ramanujan Hostel (BH-1)',
      'Aryabhatt Hostel (BH-2)',
      'Bhabha Hostel (BH-3)',
      'Kaveri Hostel (GH-1)',
      'Godavari Hostel (GH-2)'
    ],
    expressTimeMins: 50,
    runnerStation: 'Dwarka Sec-12 Station #3'
  },
  {
    id: 'iiit-delhi',
    city: 'Delhi NCR',
    name: 'IIIT Delhi (Okhla Phase III)',
    code: 'IIITD-05',
    hostels: [
      'Boys Hostel Block A',
      'Boys Hostel Block B',
      'Girls Hostel Block H',
      'Graduate Residences'
    ],
    expressTimeMins: 40,
    runnerStation: 'Govindpuri Tech Post #9'
  },
  {
    id: 'iim-rohtak',
    city: 'Rohtak',
    name: 'IIM Rohtak (Sunaria Campus)',
    code: 'IIMR-01',
    hostels: [
      'Executive Hostel Tower A',
      'Executive Hostel Tower B',
      'Student Dorm Block 1',
      'Student Dorm Block 2',
      'Scholars Residence'
    ],
    expressTimeMins: 30,
    runnerStation: 'Sunaria Tech Base Alpha'
  },
  {
    id: 'mdu-rohtak',
    city: 'Rohtak',
    name: 'MDU Rohtak (Maharshi Dayanand Univ)',
    code: 'MDUR-02',
    hostels: [
      'Tagore Hostel (Boys)',
      'Nehru Hostel (Boys)',
      'Lal Bahadur Shastri Hostel',
      'Ganga Girls Hostel',
      'Yamuna Girls Hostel',
      'Saraswati Girls Hostel'
    ],
    expressTimeMins: 35,
    runnerStation: 'Delhi Road Pod #2'
  },
  {
    id: 'pgims-rohtak',
    city: 'Rohtak',
    name: 'Pt. B.D. Sharma PGIMS Rohtak',
    code: 'PGIMS-03',
    hostels: [
      'Old Doctors Hostel',
      'New Resident Hostel Block 1',
      'New Resident Hostel Block 2',
      'Medicos Girls Hostel',
      'Interns Hostel'
    ],
    expressTimeMins: 40,
    runnerStation: 'Medical Mod Outpost'
  }
];
