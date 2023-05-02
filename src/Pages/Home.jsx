import React from "react";
import HomeCard from "../components/HomeCard";
import user from "../public/user.png"
import semester from "../public/semester.png"
import program from "../public/program.png"
const Home = () => {
    const options = [
        { title: "User", icon: user, link: "/user" },
        { title: "Semester", icon: semester, link: "/semester" },
        { title: "Program", icon: program, link: "/program" },
        { title: "Course", icon: "iconx", link: "/course" }
    ] 
    return (
        <div className="cards">
            {options.map((option) => {
                console.log(option);
                return <HomeCard title={option.title} icon={option.icon} />
            })}

        </div>
    )
};

export default Home;
