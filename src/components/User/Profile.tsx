import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Profile } from "../../entity/profile";
import { authenticateUser } from "../../service/auth";

export default function UserProfile() {
    const [profileDetails, setProfileDetails] = useState<Profile>();

    useEffect(() => {
        userProfile();
    }, [])
    const userProfile = async () => {
        let response = await authenticateUser()
        localStorage.setItem('UserData', JSON.stringify(response))
        setProfileDetails(response)
    }
    return (<>
        <Container>
            <h1>Profile Page</h1>
            <div className="product-details">
                <table>
                    <tr>
                        <td><label htmlFor="userName">User Name : </label></td>
                        <td><h1>{profileDetails?.username}</h1></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="fname">First Name : </label></td>
                        <td><h1>{profileDetails?.firstName}</h1></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="lName">Last Name : </label></td>
                        <td><h1>{profileDetails?.lastName}</h1><br /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email">Email : </label></td>
                        <td><h1> {profileDetails?.email}</h1></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="age">Age : </label></td>
                        <td> <h1>{profileDetails?.age}</h1></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="birthdate">Birth Date : </label></td>
                        <td><h1>{profileDetails?.birthDate}</h1></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="bloodGrp">Blood Group : </label></td>
                        <td><h1>{profileDetails?.bloodGroup}</h1></td>
                    </tr>
                    <tr>
                        <td>  <label htmlFor="brand">Phone : </label></td>
                        <td> <h1>{profileDetails?.phone}</h1></td>
                    </tr>
                    <tr>
                        <td>  <label htmlFor="brand">SSN : </label></td>
                        <td><h1>{profileDetails?.birthDate}</h1></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="brand">Birth Date : </label></td>
                        <td><h1>{profileDetails?.birthDate}</h1></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="brand">Address : </label></td>
                        <td> <p>{profileDetails?.address.address}</p>
                            <p>{profileDetails?.address.city}</p>
                            <p>{profileDetails?.address.state}</p>
                            <p>{profileDetails?.address.postalCode}</p></td>
                    </tr>
                </table>
            </div>
        </Container>

    </>)
}