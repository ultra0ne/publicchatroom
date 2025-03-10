import { format } from "date-fns";

export function UiElement(divele){


    const userInfoEle = (data)=>{

        const uid = data.uid;
        const email = data.email;
        const fullname = data.displayName;
        const photourl = "https://cdn-icons-png.flaticon.com/512/6522/6522516.png";
        const createdtime = data.metadata.creationTime;

        // const getdata = new Date(createdtime).getDate();
        // const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        // const getmonth = new Date(createdtime).getMonth();
        // const getyear = new Date(createdtime).getFullYear();

        // const formatteddate =` ${getdate} ${months[getmonth]} ${getyear}`;

        // cdn 
        // const formatteddate = dateFns.format(new Date(createdtime),'do MMM yyyy');
        // console.log(formatteddate);

        // npm 
        const formatteddate = format(new Date(createdtime),'do MMM yyyy');
        console.log(formatteddate);



        // console.log(data);

        const html = `
                <img width="100" src="${photourl}"/>
                <p>UID : ${uid} </p>
                <p>Display Name : ${fullname} </p>
                <p>Email : ${email} </p>
                <p>Cereate at : ${formatteddate}</p>
        `;

        divele.innerHTML = html;

    }

    return {userInfoEle};

}