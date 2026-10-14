import reportWebVitals from './reportWebVitals';
import { waitFor } from '@testing-library/react';
import * as metrics from 'web-vitals';
jest.mock('web-vitals',()=>({getCLS:jest.fn(),getFID:jest.fn(),getFCP:jest.fn(),getLCP:jest.fn(),getTTFB:jest.fn()}));
test('registers all metrics only when a callback is supplied',async()=>{
  reportWebVitals(); reportWebVitals('invalid');
  const collectors=['getCLS','getFID','getFCP','getLCP','getTTFB'].map(name=>metrics[name]);
  collectors.forEach(metric=>expect(metric).not.toHaveBeenCalled());
  const callback=()=>{}; reportWebVitals(callback);
  await waitFor(()=>collectors.forEach(metric=>expect(metric).toHaveBeenCalledWith(callback)));
});
