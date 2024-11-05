import React, { useEffect, useState } from 'react'
import {  Redirect, Stack, router, useFocusEffect } from 'expo-router'
import { Loading } from '../../components';
import { useProductGlobalContext } from '../../Context/GlobalStateProduct';
import { useAdminGlobalContext } from '../../Context/GlobalStateAdmin';

export default function Page() {
    const {loadingPage} = useProductGlobalContext();
    const {loadingDataAdmin, isSession, dataAdmin} = useAdminGlobalContext();
    useEffect(()=>{
        if (!loadingDataAdmin && !loadingPage) {
            console.log(isSession);
            if (isSession) {
                router.push("/home");
                return;
            }
            if (!isSession) {
                router.push("/auth")
                return;
            }
        }
    },[isSession, loadingDataAdmin, loadingPage])
    if (loadingDataAdmin || loadingPage ) {
        return (<Loading/>)
    }

    return <Stack  initialRouteName='(root)'>
        <Stack.Screen 
            name='(root)'
            options={{
                headerShown : false
            }}
        />
        <Stack.Screen 
            name='auth'
            options={{
                presentation :'modal',
                headerShown : false
            }}/>
    </Stack>
};