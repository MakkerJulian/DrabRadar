import { Faker } from '@faker-js/faker';
import { WeatherData } from 'src/typeorm/weatherdata.entity';
import { setSeederFactory } from 'typeorm-extension';

export const WeatherDataFactory = setSeederFactory(
  WeatherData,
  (faker: Faker) => {
    const weaterdata = new WeatherData();
    weaterdata.datetime = faker.date.recent({ days: 7 });
    weaterdata.dew_point = faker.number.float({ min: -50, max: 50 });
    weaterdata.rain = faker.datatype.boolean({ probability: 0.08 });
    weaterdata.sea_airpressure = faker.number.float({ min: 900, max: 1100 });
    weaterdata.snow = faker.datatype.boolean({ probability: 0.05 });
    weaterdata.snow_amount = faker.number.float({ min: 0, max: 100 });
    weaterdata.thunder = faker.datatype.boolean({ probability: 0.02 });
    weaterdata.tornado = faker.datatype.boolean({ probability: 0.01 });
    weaterdata.visibility = faker.number.float({ min: 0, max: 100 });
    weaterdata.wind_direction = faker.number.int({ min: 0, max: 360 });
    return weaterdata;
  },
);
