import { shallowMount } from '@vue/test-utils'
import Info from '@/components/wallet/subcomponents/Info.vue'
import Socials from '@/components/utils/Socials.vue'

import { storeWithUsr, fakeWallet } from '../../utils.js'

const loggedUsr = 'ben_askren'

test("dropdown of any user's wallet is visible", () => {
  const infoWrapper = shallowMount(Info, {
    propsData: {
      wallet: fakeWallet('any'),
      showValues: false
    },
    mocks: {
      $store: storeWithUsr('doesnt matter')
    }
  })
  const dropdown = infoWrapper.get('b-dropdown')
  expect(dropdown.isVisible()).toBe(true)
})

test("dropdown of logged user's wallet is visible", () => {
  const infoWrapper = shallowMount(Info, {
    propsData: {
      wallet: fakeWallet(loggedUsr),
      showValues: false
    },
    mocks: {
      $store: storeWithUsr(loggedUsr)
    }
  })
  const dropdown = infoWrapper.get('b-dropdown')
  expect(dropdown.isVisible()).toBe(true)
})

test("dropdown of any user's wallet has visible Socials", () => {
  const infoWrapper = shallowMount(Info, {
    propsData: {
      wallet: fakeWallet('any'),
      showValues: false
    },
    mocks: {
      $store: storeWithUsr('doesnt matter')
    }
  })
  const socials = infoWrapper.findAllComponents(Socials).at(0)
  expect(socials.isVisible()).toBe(true)
})

test("dropdown of logged user's wallet has visible Socials", () => {
  const infoWrapper = shallowMount(Info, {
    propsData: {
      wallet: fakeWallet(loggedUsr),
      showValues: false
    },
    mocks: {
      $store: storeWithUsr(loggedUsr)
    }
  })
  const socials = infoWrapper.findAllComponents(Socials).at(0)
  expect(socials.isVisible()).toBe(true)
})

test("dropdown of logged user's wallet has visible remove and edit options", () => {
  const infoWrapper = shallowMount(Info, {
    propsData: {
      wallet: fakeWallet(loggedUsr),
      showValues: false
    },
    mocks: {
      $store: storeWithUsr(loggedUsr)
    }
  })
  const dropdownButtons = infoWrapper.findAll('b-dropdown-item-button')
  const removeWalletBtn = dropdownButtons.filter(
    btn => btn.text().includes('Excluir carteira')).at(0)
  const editWalletBtn = dropdownButtons.filter(
    btn => btn.text().includes('Editar carteira')).at(0)
  expect(removeWalletBtn).toBeTruthy()
  expect(editWalletBtn).toBeTruthy()
})

test("dropdown of any user's wallet has no remove and edit options", () => {
  const infoWrapper = shallowMount(Info, {
    propsData: {
      wallet: fakeWallet('any'),
      showValues: false
    },
    mocks: {
      $store: storeWithUsr('doesnt matter')
    }
  })
  const dropdownButtons = infoWrapper.findAll('b-dropdown-item-button')
  const removeWalletBtnArr = dropdownButtons.filter(
    btn => btn.text().includes('Excluir carteira'))
  const editWalletBtnArr = dropdownButtons.filter(
    btn => btn.text().includes('Editar carteira'))
  expect(removeWalletBtnArr.length).toBe(0)
  expect(editWalletBtnArr.length).toBe(0)
})
