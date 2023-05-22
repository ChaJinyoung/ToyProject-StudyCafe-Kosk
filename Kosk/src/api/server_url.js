import { serverip } from "../../env/auth";

export const server_url = {
    memberSignup: `http://${serverip}/api/member/signup`,
    memberLogin: `http://${serverip}/api/member/login`,
    memberLogout: `http://${serverip}/api/member/logout`,

    seatUsing: `http://${serverip}/api/seat/using`,
    seatSave: `http://${serverip}/api/seat/save`,
    seatExit: `http://${serverip}/api/seat/exit`,
    seatCount: `http://${serverip}/api/seat/count`,

    roomUsing: `http://${serverip}/api/studyroom/using`,
    roomSave: `http://${serverip}/api/studyroom/save`,
    roomDelay: `http://${serverip}/api/studyroom/delay`,
    roomCount: `http://${serverip}/api/studyroom/count`,
    roomExit: `http://${serverip}/api/studyroom/exit`,

    lockerUsing: `http://${serverip}/api/locker/using`,
    lockerSave: `http://${serverip}/api/locker/save`,
    lockerCount: `http://${serverip}/api/locker/count`,

    chargeTime: `http://${serverip}/api/time/charge`,
    pay: `http://${serverip}/api/pay/save`,
};