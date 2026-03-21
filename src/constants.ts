
export interface Vehicle {
  id: string;
  name: string;
  class: string;
  price: number;
  range: string;
  topSpeed: string;
  image: string;
  category: 'SEDAN' | 'SUV' | 'PERFORMANCE' | 'LIMITED';
  specs?: {
    acceleration?: string;
    output?: string;
    cargo?: string;
    seating?: string;
    chargeTime?: string;
    audio?: string;
  };
}

export const VEHICLES: Vehicle[] = [
  {
    id: 'x-pulse-01',
    name: 'X-PULSE 01',
    class: 'INTERCEPTOR CLASS',
    price: 142000,
    range: '540 MI',
    topSpeed: '218 MPH',
    category: 'PERFORMANCE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1ZMffJZujn1grnlRIYoVlt22bUFgDoP1HmgZvM1VwM9LOYuwYVPMo-tp9XFY1ZIgtZJHbZChtYChMT5Z-kU5M90NjLKdOXFhBUeyJYAp3TACvpLn-h08r9fgke6qFU9PrxSeD-bneOkUo9BvFeYrgsQpJKaMa-1SCVjtjdZPlF8hs1FZ-uEvc9UMyUlTiwaBKmy3r_dqbxgFt0vQMAGkBVnhQE9Z-H5ZWytYRBj4Nsxoe-W-w_3yHQ88ZXvbFoapr8-PGK7mXn6w',
    specs: { acceleration: '1.9s', output: '820KW' }
  },
  {
    id: 'void-runner',
    name: 'VOID RUNNER',
    class: 'STEALTH UTILITY',
    price: 189000,
    range: '620 MI',
    topSpeed: '195 MPH',
    category: 'LIMITED',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtiDoRX3hCrXRYXmJmNx1uIM4B0CeBYcnkLLSTclHbvEBFsxtZLKyWpWzhz9mwD5LNxxvEipgbnNEoQ_ChHgE2uSaRYFgSUQf-KVjQbU7x_8yIMe94ZXx8NIA7QY0KYoWU_77gY6i3-FBMA47MzWCA7lyrqDOOWvCLzy1X9Hk7KYnOSHd7ruxajzCpaNoYZn-l1mupqvkpyAKREimkZaqXjBFKTCEP7Ht5KucJgTIk_cKnAw2KCCygltyoMHWoX7BbrqIBGTyYDa4',
    specs: { acceleration: '2.4s', output: '750KW' }
  },
  {
    id: 'apex-prime',
    name: 'APEX PRIME',
    class: 'COMMAND UNIT',
    price: 215000,
    range: '480 MI',
    topSpeed: '242 MPH',
    category: 'PERFORMANCE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUkQ_X5lXtSjbUCc43DQi6Jiz0gPEf_0WfUZUi0ixhVK5cbOMb_W3RCzrxi5LaFLQaaiNpdcxz1SmVqSpW6o9-qb31dfx5DwipXSM6WbtNeXVVoNx2T7KrsPTFoJHVMnKGPeIXIouJWKn7ddB_UrvMc5izt0RNL_zutZzbcpy0MOM2a6yX4K-dXXvnXfPSG09Ll1qr2T3ow6Uu3dKPsc10DDcagsRU9tDHIpFJFQp0D0v-xBQbE77irvseXMpgxXMCXyrXEDeVYyM',
    specs: { acceleration: '2.0s', output: '900KW' }
  },
  {
    id: 'solx-apex',
    name: 'SOLX APEX',
    class: 'PERFORMANCE',
    price: 124500,
    range: '412 MI',
    topSpeed: '205 MPH',
    category: 'PERFORMANCE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxMHUMNgTuAhtv3LF4BFWG8ylkKbIeHbGD2_BjxSuXse4rj-DIcyvcFujIqBzxLe3654m2VO7wL5ue5qpr6DVw3x_oqF5Cgn99d8xx3sst8E7___mGOy0y83BXtz8Fugj2a0iUf-nV8aOP1bFluY1Q1Ss4RZjWdS6YStrHbvJa9FfE9ycfnYnuKrGS7B9fOUArNvuX29IIR745agZd1T9p261Ty1NjA7jbuR-syq64vt4cAkKh6M2SaJF5u1srQYdTvSq5u1fHRKE',
    specs: { acceleration: '2.1s', chargeTime: '15 MIN' }
  },
  {
    id: 'nexus-voyager',
    name: 'NEXUS VOYAGER',
    class: 'FAMILY / UTILITY',
    price: 89200,
    range: '380 MI',
    topSpeed: '155 MPH',
    category: 'SUV',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq6K-gq5k2QkX8tlFlrjmyBcv3-uOm0IOb2ib9Hs4eCHPO3_kZcNQo1GGhReqrXJwHl5L9qX-xBPjSCteXkqjTpbbzV_Ntd_HIYs4BZhptnfxA7fRUv62BAHSyA-kYhOAW6spnKLj3c8v6NVhiX7t5chCLB0etzCAo-G8Z1wEj6ilauT_PgooCdAO1NAGQJuMgswfD_Xd6iqyAmGoCQh5OIBEAB7GB-NqKtbvp664dyFCh-nPVFxajMqNm9cMwQIrFSH0BNhDT5mY',
    specs: { acceleration: '3.4s', cargo: '88 CU FT', seating: '7 ADULT' }
  },
  {
    id: 'solx-velocity',
    name: 'SOLX VELOCITY',
    class: 'GRAND TOURING',
    price: 106000,
    range: '520 MI',
    topSpeed: '180 MPH',
    category: 'SEDAN',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6-AB0aGdvJ6b4-Har9Q3bGjzAviMRZCBdg5mpKKfH3GhOKP8jaPX9-1hFi9pqouRbbP9JT4lPDh4bAmgE-QzIXLV5g0jESeqnY0DXRGxJpXMsqdAtcGfBNvq_SmUxxUNFDt_iHI36Ekz3qRnlf6Zgk7VymmE0jMgCm9msLkPcnyt5Q1Egzxl7ahRhEM7UmjQ3rn969E6a-yQ6sx1kHV-cV7-AZq3OBivRQ_-bzhZ25SR0AAeIomXStsBjaZ_SJ5UK7F33JpHYVpY',
    specs: { acceleration: '2.9s', audio: '24 SPK', chargeTime: '15 MIN' }
  }
];
