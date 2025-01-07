import { createContext, useContext, useState } from "react";

const TeamContext = createContext(); 

export function TeamProvider ({children}) {
    const [team, setTeam] = useState ([]);
    
    return (
        <TeamContext.Provider value = {{team, setTeam}}>
            {children}
        </TeamContext.Provider>
    );
}

export function useTeam (){
    return useContext (TeamContext); 
}