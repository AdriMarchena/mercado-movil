import { View, Text, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin'
import { FormWorker, StyleText, StyleTextTitle } from '../../../../components'

const imgDefault = "https://res.cloudinary.com/dun7xxiya/image/upload/v1703274563/profileAdmin_fzl1ye.jpg"

export default function addWorker() {
  return (
    <FormWorker/>
  )
};